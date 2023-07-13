import { createNextRouteHandler } from "uploadthing/next";
// if cloudinary limit will exceed(backcup route)
import { ourFileRouter } from "./core";
 // todo: migrate to aws s3 because of 2gb limit
// Export routes for Next App Router
export const { GET, POST } = createNextRouteHandler({
  router: ourFileRouter,
});