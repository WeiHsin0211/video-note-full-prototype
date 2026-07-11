import json
import os
from datetime import datetime, timezone
from pathlib import Path
from typing import Any


DEFAULT_STORAGE_DIR = Path(__file__).resolve().parents[1] / "data" / "transcripts"


def get_storage_dir() -> Path:
    return Path(os.getenv("TRANSCRIPT_STORAGE_DIR", str(DEFAULT_STORAGE_DIR)))


def save_transcript(
    *,
    task_id: str,
    url: str,
    text: str,
    language: str,
    model: str,
    metadata: dict[str, Any] | None = None,
) -> dict[str, Any]:
    storage_dir = get_storage_dir()
    storage_dir.mkdir(parents=True, exist_ok=True)

    record = {
        "task_id": task_id,
        "url": url,
        "text": text,
        "language": language,
        "model": model,
        "created_at": datetime.now(timezone.utc).isoformat(),
        "metadata": metadata or {},
    }

    transcript_path = get_transcript_path(task_id)
    tmp_path = transcript_path.with_suffix(".json.tmp")
    tmp_path.write_text(
        json.dumps(record, ensure_ascii=False, indent=2),
        encoding="utf-8",
    )
    tmp_path.replace(transcript_path)

    return record


def get_transcript_path(task_id: str) -> Path:
    safe_task_id = task_id.replace("/", "_").replace("\\", "_")
    return get_storage_dir() / f"{safe_task_id}.json"


def get_transcript(task_id: str) -> dict[str, Any] | None:
    transcript_path = get_transcript_path(task_id)
    if not transcript_path.exists():
        return None

    return json.loads(transcript_path.read_text(encoding="utf-8"))
