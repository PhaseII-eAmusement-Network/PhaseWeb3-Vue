import DownloadJS from "downloadjs";

export function exportJSON(path, data) {
  var timestamp = Math.floor(Date.now() / 1000);

  DownloadJS(
    JSON.stringify(data, null, 4),
    `phaseii_export${path}_${timestamp}.json`,
    "text/plain",
  );
}
