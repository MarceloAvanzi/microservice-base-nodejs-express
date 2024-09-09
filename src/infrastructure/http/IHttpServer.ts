export default interface IHttpServer {
  listen(port: number): void;
  // use(url: string, callback: Function): void;
  // on(method: string, url: string, callback: Function): void;
}