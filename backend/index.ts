import cors from "cors";
import express from "express";
import path from "path";
import axios from "axios";
import zod from "zod";
import { UserLogin } from "./db";
import dotenv from "dotenv";
dotenv.config();


const app = express();
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});

const fetchLoginSchema = zod.object({
    from: zod.string(),
    to: zod.string(),
    });


app.use(cors());
app.use(express.json());

app.use(express.static(path.join(__dirname, "public")));



const __dirname1 = path.resolve();
console.log( path.resolve(__dirname, "../../frontend", "dist", "index.html"))

if (true) {
  app.use(express.static(path.join(__dirname, "../../frontend/dist")));
  
  app.get("/api/healthcheck", function(req,res){
    res.json({ status: 'ok' })
  
  })
  app.get("/fetchLogin", async (req, res) => {
    console.log("fetchLogin", req.query);  
    const data = fetchLoginSchema.safeParse(req.query);
    if (data.success === false) {
        res.status(400).json({ error: data.error });
        return;
    }
    let from = data.data.from;
    let to = data.data.to
      const toDate = new Date(from);
      toDate.setDate(toDate.getDate() + 1);
      to = toDate.toISOString();

    const query = {
      time : {"$gte": new Date(from),"$lte": new Date(to)}
    }
    console.log("query", query);
    const result = await UserLogin.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "phone",
          foreignField: "Phone",
          as: "user_details"
        }
      },
      {
        $unwind: "$user_details"
      },
      {
        $match: query
      },
      {
        $project: {
          _id: 0,
          Phone: 1,
          Tag: "$user_details.Tag",
          time : "$time"
        }
      }
    ])

    const tagCounts = result.reduce((acc : any, item :any) => {
      acc[item.Tag] = (acc[item.Tag] || 0) + 1;
      return acc;
    }, {});
    

    const totalItems = result.length;
    const tagPercentages : any = {};
    
    for (const tag in tagCounts) {
      tagPercentages[tag] = ((tagCounts[tag] / totalItems) * 100).toFixed(2);
    }

    
    console.log("fetchLogin", result);
    console.log("from", from);
    console.log("to", to);
    console.log("tagCounts", tagCounts);
    console.log("tagPercentages", tagPercentages);
    console.log("totalItems", totalItems);
    const percentage = [];
    for (const tag in tagCounts) {
      const a = extractNumber(tag)
      percentage.push({ tag, percentage: parseFloat(tagPercentages[tag]) , count : parseFloat(tagCounts[tag])});
    }
    res.json({ percentage , totalItems });
  });
  app.get("*", (req, res) =>
    res.sendFile(path.resolve(__dirname, "../../frontend", "dist", "index.html"))
  );  
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}

function extractNumber(str:any) {
  const match = str.match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
}

app.get("/fetchLogin", async (req, res) => {
    console.log("fetchLogin", req.query);  
    const data = fetchLoginSchema.safeParse(req.query);
    if (data.success === false) {
        res.status(400).json({ error: data.error });
        return;
    }
    let from = data.data.from;
    let to = data.data.to
      const toDate = new Date(from);
      toDate.setDate(toDate.getDate() + 1);
      to = toDate.toISOString();

    const query = {
      time : {"$gte": new Date(from),"$lte": new Date(to)}
    }
    console.log("query", query);
    const result = await UserLogin.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "phone",
          foreignField: "Phone",
          as: "user_details"
        }
      },
      {
        $unwind: "$user_details"
      },
      {
        $match: query
      },
      {
        $project: {
          _id: 0,
          Phone: 1,
          Tag: "$user_details.Tag",
          time : "$time"
        }
      }
    ])

    const tagCounts = result.reduce((acc : any, item :any) => {
      acc[item.Tag] = (acc[item.Tag] || 0) + 1;
      return acc;
    }, {});
    

    const totalItems = result.length;
    const tagPercentages : any = {};
    
    for (const tag in tagCounts) {
      tagPercentages[tag] = ((tagCounts[tag] / totalItems) * 100).toFixed(2);
    }

    
    console.log("fetchLogin", result);
    console.log("from", from);
    console.log("to", to);
    console.log("tagCounts", tagCounts);
    console.log("tagPercentages", tagPercentages);
    console.log("totalItems", totalItems);
    const percentage = [];
    for (const tag in tagCounts) {
      const a = extractNumber(tag)
      percentage.push({ tag, percentage: parseFloat(tagPercentages[tag]) , count : parseFloat(tagCounts[tag])});
    }
    res.json({ percentage , totalItems });
});




