import yt_dlp


def get_video_info(url: str):
    ydl_opts = {
        "quiet": True,
        "no_warnings": True,
        "force_generic_extractor": False,
        "skip_download": True,
        "extract_flat": "in_playlist",
        "no_playlist": True,
        "format": "bestaudio/best",
    }

    with yt_dlp.YoutubeDL(ydl_opts) as ydl:
        try:
            info = ydl.extract_info(url, download=False)
            return {
                "title": info.get("title"),
                "description": info.get("description"),
                "duration": info.get("duration"),
                "thumbnail": info.get("thumbnail"),
                "uploader": info.get("uploader"),
            }
        except Exception as exc:
            return {"error": str(exc)}
