import React, { useState, useEffect } from 'react';
import NoteExporter from '@/components/upload/NoteExporter'; // 引入剛才寫的組件

interface VideoTaskResponse {
  summary: string;
  raw_transcript: string;
  title?: string;
}

const Notepage: React.FC = () => {
  const [data, setData] = useState<VideoTaskResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // 這裡模擬從 Celery Backend 取得結果
    // 在實際環境中，你會根據 Task ID 從 Redis 或 Database 抓取
    const fetchNoteData = async () => {
      try {
        // 模擬 API 呼叫
        const response = await fetch('http://localhost:8001/api/notes/latest'); 
        const result = await response.json();
       // 假設後端會回傳 task_status
        if (result.status === 'SUCCESS') {
          setData(result);
          setLoading(false);
        } else {
          // 如果還在處理，3 秒後再試一次
          setTimeout(fetchNoteData, 3000);
        }
      } catch (error) {
        console.error("無法取得筆記資料", error);
        // 出錯時也要停止 loading，或顯示錯誤訊息
        setLoading(false); 
      }
    };

    fetchNoteData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-xl animate-pulse text-gray-500">正在生成您的專業筆記...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        {/* 1. 筆記預覽與下載區 */}
        {data && (
          <NoteExporter 
            content={data.summary} 
          />
        )}

        {/* 2. 原始逐字稿區 (隱藏式，避免佔空間) */}
        {data?.raw_transcript && (
          <div className="mt-12 max-w-4xl mx-auto px-4">
            <details className="group border-t border-gray-200 pt-6">
              <summary className="flex cursor-pointer items-center justify-between font-medium text-gray-500 hover:text-gray-800">
                <span>查看原始逐字稿 (Raw Transcript)</span>
                <span className="transition group-open:rotate-180">
                  <svg fill="none" height="24" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" width="24"><path d="M6 9l6 6 6-6"></path></svg>
                </span>
              </summary>
              <div className="mt-4 bg-gray-100 p-6 rounded-lg text-sm text-gray-700 leading-relaxed max-h-96 overflow-y-auto font-mono">
                {data.raw_transcript}
              </div>
            </details>
          </div>
        )}
      </div>
    </div>
  );
};

export default Notepage;