from celery.result import AsyncResult
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from services.youtube import get_video_info
from services.transcripts import get_transcript
from tasks import process_video_full_logic


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://127.0.0.1:8080"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class VideoLinkRequest(BaseModel):
    url: str


class VideoTaskRequest(BaseModel):
    url: str
    options: dict


@app.get("/")
async def root():
    return {"message": "VideoNote API is running!"}


@app.post("/fetch-info")
async def fetch_video_info(request: VideoLinkRequest):
    return get_video_info(request.url)


@app.post("/submit-task")
async def submit_video_task(request: VideoTaskRequest):
    task = process_video_full_logic.delay(request.url, request.options)

    return {
        "task_id": task.id,
        "status": "pending",
        "message": "Video processing task submitted",
    }


@app.options("/{rest_of_path:path}")
async def preflight_handler():
    return {}


@app.get("/tasks/{task_id}")
async def get_task_status(task_id: str):
    task_result = AsyncResult(task_id)
    transcript = get_transcript(task_id)

    response = {
        "task_id": task_id,
        "status": task_result.status,
        "result": None,
        "transcript_available": transcript is not None,
    }
    print(f"DEBUG: Current status is {task_result.status}")

    if task_result.status == "SUCCESS":
        response["result"] = task_result.result
    elif task_result.status == "FAILURE":
        response["result"] = str(task_result.info)

    return response


@app.get("/api/tasks/{task_id}")
async def get_api_task_status(task_id: str):
    task_result = AsyncResult(task_id)
    transcript = get_transcript(task_id)

    result_data = None
    if task_result.status == "SUCCESS":
        result_data = task_result.result

    return {
        "task_id": task_id,
        "status": task_result.status,
        "result": result_data,
        "transcript_available": transcript is not None,
    }


@app.get("/tasks/{task_id}/transcript")
async def get_task_transcript(task_id: str):
    transcript = get_transcript(task_id)
    if transcript is None:
        raise HTTPException(status_code=404, detail="Transcript not found")

    return transcript


@app.get("/api/tasks/{task_id}/transcript")
async def get_api_task_transcript(task_id: str):
    return await get_task_transcript(task_id)
