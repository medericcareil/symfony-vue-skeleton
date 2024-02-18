/**
 * Method to download file
 * @param {any} response 
 */
export function download(response: any): void {
    const file : string = window.URL.createObjectURL(new Blob([response.data]));
    const pattern = new RegExp('\"(.*?)\"');
    const name = response.headers['content-disposition'].match(pattern);
    let el : HTMLAnchorElement = <HTMLAnchorElement>document.createElement('a');
    el.href = file;
    el.setAttribute('download', name[1]);
    el.click();
}
