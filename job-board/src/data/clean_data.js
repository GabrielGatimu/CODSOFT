import {uncleaned_data} from "./uncleaned_data.js";
import fs from "fs";

let data = uncleaned_data

let usedIds = new Set()
let maxId = 0

data.forEach(obj => {
    let currentId = obj["id"]

    if (usedIds.has(currentId)) {
        maxId++
        obj["id"] = maxId
    } else {
        usedIds.add(currentId)
        maxId = Math.max(maxId, currentId)
    }
})

const jsonData = JSON.stringify(data, null, 2)

fs.writeFileSync('cleaned_data.json', jsonData)


