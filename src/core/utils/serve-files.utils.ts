import { getAccessToken } from "../services/authentication/authentication.service";

export const serve = async (files: any, id: number, setmyFiles: any) => {
  const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
  const token = getAccessToken();
  await files.forEach(async (item: any) => {
    const result = await fetch(
      MainUrl + "/api/Upload/ServeFile?fileName=" + item,
      {
        headers: {
          Authorization: token ? "Bearer " + token : "",
          accept: "text/plain",
        },
      }
    );

    const arrayBuffer = await result.arrayBuffer();
    const blob = new Blob([arrayBuffer]);

    if (window.navigator && window.navigator.msSaveOrOpenBlob) {
      console.log("---inja reside ----");
      window.navigator.msSaveOrOpenBlob(blob);
      return;
    }

    const url = URL.createObjectURL(blob);
    setmyFiles((prev: any) => {
      return [
        ...prev,
        { id: id, value: { file: blob, fileUrl: url, fileName: item } },
      ];
    });
  });

  // setmyFiles();
};
