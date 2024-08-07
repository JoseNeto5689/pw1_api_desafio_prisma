import express from "express"
import routes from "./routes/index.route"

declare module "express" {
    interface Request {
      user?: any;
    }
  }

const app = express()

app.use(express.json())
app.use(routes)


app.listen(3000, () => {
    console.table({
        status: "working",
        url: "http://localhost:3000"
    })
})