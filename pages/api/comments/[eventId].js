function handler(req, res) {
    const eventId = req.query.evendId;

    if (req.method === 'POST') {
        const {email, name, text}  = req.body;

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

        console.log(newComment);

        res.status(201).json({message: 'Added comment.', comment: newComment});
    }

    if (req.method === 'GET') {
        const dummyList = [
            {id: 'c1', name: 'Max', text: 'A first comment!'},
            {id: 'c2', name: 'Manuel', text: 'A second   comment!'},
        ];

        res.status(200).json({comments: dummyList});
    }
}

export default handler;