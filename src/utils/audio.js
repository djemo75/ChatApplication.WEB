/* eslint-disable no-async-promise-executor */
export async function getBlobDuration(blob) {
  const tempVideoEl = document.createElement("audio");

  const durationP = new Promise((resolve, reject) => {
    tempVideoEl.addEventListener("loadedmetadata", () => {
      if (tempVideoEl.duration === Infinity) {
        tempVideoEl.currentTime = Number.MAX_SAFE_INTEGER;
        tempVideoEl.ontimeupdate = () => {
          tempVideoEl.ontimeupdate = null;
          resolve(tempVideoEl.duration);
          tempVideoEl.currentTime = 0;
        };
      }
      // Normal behavior
      else resolve(tempVideoEl.duration);
    });
    tempVideoEl.onerror = (event) => reject(event.target.error);
  });

  tempVideoEl.src =
    typeof blob === "string" || blob instanceof String
      ? blob
      : window.URL.createObjectURL(blob);

  return durationP;
}

export const audioRecorder = () => {
  return new Promise(async (resolve) => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    let audioChunks = [];

    mediaRecorder.addEventListener("dataavailable", (event) => {
      audioChunks.push(event.data);
    });

    const start = () => {
      audioChunks = [];
      mediaRecorder.start();
    };

    const stop = () =>
      new Promise((resolve) => {
        mediaRecorder.addEventListener("stop", async () => {
          const audioBlob = new Blob(audioChunks);
          const audioUrl = URL.createObjectURL(audioBlob);
          const audio = new Audio(audioUrl);
          const play = () => audio.play();

          const getDuration = async () => {
            const duration = await getBlobDuration(audioBlob);
            return duration;
          };

          resolve({ audioChunks, audioBlob, audioUrl, play, getDuration });
        });

        mediaRecorder.stop();
        stream.getTracks().forEach((track) => track.stop());
      });

    resolve({ start, stop });
  });
};
