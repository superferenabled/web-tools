export declare class Uploads {
    static resourcesPath: string;
    static mkdirSync(path: any, cb: any): void;
    static checkDir(dirPath: any): any;
    static checkDirFromParams(dirPath: any, paramName: any): any;
    static copyFiles(oFiles: any, previousPath: any, DestinyPath: any, cb: any): any;
    static copyMoveFiles(oFiles: any, previousPath: any, DestinyPath: any, cb: any): void;
    static moveFile(files: any, destination: any, cb: any): void;
    static replaceFile(files: any, destination: any, previousPath: any, previousFile: any, cb: any): void;
    static removeFile(path: any, cb: any): void;
    static saveBase64ToImage(strB64: any, dir: any): any;
    static downloadImage(uri: any, newName: any, callback: any): void;
    static uploadToS3(params: any, cb: any): void;
}
