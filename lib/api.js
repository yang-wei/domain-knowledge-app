import fs from "fs"
import {join} from "path"

const contentDirectory = join(process.cwd(), 'contents')

export function getQuestions(number) {
    const questions = [];
    const topics = getTopics(contentDirectory) 
    topics.forEach(({ topic, file }) => {
        const contents = parseContent(fs.readFileSync(file))
        contents.forEach(question => {
            questions.push({topic: topic, question: question})
        })
    })
    return takeRandom(questions, number);
}

const getTopics = function(dir) {
    return fs.readdirSync(dir).map(file => {
        return {topic: fileNameToTopic(file), file: join(dir, file)}
    })
}

const fileNameToTopic = function(filename) {
    return filename.split("_").join(" ")
}

const parseContent = function (contents) {
    return contents.toString().split("\n")
}

const takeRandom = function (list, number) {
    return list.slice().sort(() => Math.random() - 0.5).slice(0, number);
}