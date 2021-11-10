import { app } from './shared/http/app';

app.listen(process.env.PORT || 5000, () => {
    console.log("Server on port 5000 \nhttp://localhost:5000 ")
})
