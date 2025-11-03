import { app } from "./app.ts";
import { port } from "./config.ts";

app.listen(port, ()=>{
    console.log(`Server running at port: ${port}`);
})