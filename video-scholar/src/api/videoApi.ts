import axios from 'axios';

const api = axios.create({
    baseURL:'http://127.0.0.1:8001',
});

type SubmitTaskOptions = Record<string, unknown>;

export const videoApi = {
    //抓取影片資訊(Step2使用)
    fetchVideoInfo:async(url:string)=>{
      const response = await api.post('/fetch-info',{url});
      return response.data; 
    },

    //提交任務(Step5使用)
    submitTask:async(url:string, options:SubmitTaskOptions)=>{
        const response = await api.post('submit-task',{url, options});
        return response.data;
    },
    //檢查進度
    checkStatus:async (taskId:string)=>{
        const response = await api.get(`/tasks/${taskId}`);
        return response.data;
    },
    // 🚀 新增：穩定輪詢邏輯
    waitForTask: async (taskId: string, onProgress?: (status: string) => void) => {
        return new Promise((resolve, reject) => {
            const timer = setInterval(async () => {
                try {
                    const data = await videoApi.checkStatus(taskId);
                    if (onProgress) onProgress(data.status);

                    if (data.status === 'SUCCESS') {
                        clearInterval(timer);
                        resolve(data.result); // 回傳 AI 筆記內容
                    } else if (data.status === 'FAILURE') {
                        clearInterval(timer);
                        reject(new Error(data.result || 'AI 處理失敗'));
                    }
                } catch (err) {
                    clearInterval(timer);
                    reject(err);
                }
            }, 3000); // 每 3 秒檢查一次
        });
    }
};