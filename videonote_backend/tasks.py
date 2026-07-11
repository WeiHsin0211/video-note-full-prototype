import os

import yt_dlp
from celery import Celery
from dotenv import load_dotenv
from groq import Groq

from services.transcripts import save_transcript


load_dotenv(os.path.join(os.path.dirname(__file__), ".env"))
load_dotenv()

GROQ_API_KEY = os.getenv("GROQ_API_KEY")
if not GROQ_API_KEY:
    raise RuntimeError("GROQ_API_KEY is not configured")

CELERY_BROKER_URL = os.getenv("CELERY_BROKER_URL", "redis://127.0.0.1:6379/0")
CELERY_RESULT_BACKEND = os.getenv("CELERY_RESULT_BACKEND", CELERY_BROKER_URL)

client_groq = Groq(api_key=GROQ_API_KEY)
celery_app = Celery(
    "video_tasks",
    broker=CELERY_BROKER_URL,
    backend=CELERY_RESULT_BACKEND,
)


@celery_app.task(bind=True)
def process_video_full_logic(self, url, options):
    task_id = self.request.id
    audio_base = f"temp_{task_id}"
    actual_filename = f"{audio_base}.mp3"

    try:
        ydl_opts = {
            "format": "bestaudio/best",
            "noplaylist": True,
            "outtmpl": audio_base,
            "postprocessors": [
                {
                    "key": "FFmpegExtractAudio",
                    "preferredcodec": "mp3",
                    "preferredquality": "128",
                }
            ],
        }
        with yt_dlp.YoutubeDL(ydl_opts) as ydl:
            ydl.download([url])

        transcript_model = "whisper-large-v3"
        transcript_language = "zh"

        with open(actual_filename, "rb") as audio_file:
            transcript = client_groq.audio.transcriptions.create(
                model=transcript_model,
                file=audio_file,
                language=transcript_language,
            )
        print(f"DEBUG: Transcription completed, length {len(transcript.text)} characters")
        save_transcript(
            task_id=task_id,
            url=url,
            text=transcript.text,
            language=transcript_language,
            model=transcript_model,
            metadata={"options": options},
        )

        response = client_groq.chat.completions.create(
            model="llama-3.3-70b-versatile",
            messages=[
                {
                    "role": "system",
                    "content": (
                        "You are a helpful assistant that summarizes video transcripts "
                        "into clear, structured study notes."
                    ),
                },
                {"role": "user", "content": transcript.text},
            ],
        )

        result = response.choices[0].message.content
        print("DEBUG: Summary completed")
        return result

    finally:
        if os.path.exists(actual_filename):
            os.remove(actual_filename)
