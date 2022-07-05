import { MongoClient } from "mongodb";

async function handler(req, res) {
    const eventId = req.query.evendId;

    const client = await MongoClient.connect(
        'mongodb+srv://tanja:Knsg9JtP5wOMz0WQ@cluster0.trhh4.mongodb.net/events?retryWrites=true&w=majority'
    );


    if (req.method === 'POST') {
        const {email, name, text} = req.body;

        if (
            !email.includes('@') ||
            !name ||
            name.trim() === '' ||
            !text ||
            text.trim() === ''
        ) {
            res.status(422).json({message: 'Invalid input.'});
            return;
        }

        const newComment = {
            email,
            name,
            text,
            eventId
        };

        const db = client.db();

        const result = await db.collection('comments').insertOne(newComment);

        console.log(result);

        newComment.id = result.insertedId;

        res.status(201).json({message: 'Added comment.', comment: newComment});
    }

    if (req.method === 'GET') {
        const dummyList = [
            {id: 'c1', name: 'Max', text: 'A first comment!'},
            {id: 'c2', name: 'Manuel', text: 'A second   comment!'},
        ];

        res.status(200).json({comments: dummyList});
    }

    client.close();
}

export default handler;