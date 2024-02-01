const Joi = require('joi');
const express = require('express');
const app = express();
app.use(express.json());

const courses = [
    {id: 1, name: 'course1'},
    {id: 2, name: 'course2'},
    {id: 3, name: 'course3'},
];

app.get('/',(req,res)=>{
    res.send('Hello World');
});

app.get('/api/courses',(req,res)=>{
    res.send(courses);
})

app.post('/api/courses',(req,res)=>{
    const {error} = validateCourse(req.body); //equivalent to result.error

    if(error){
        res.status(400).send(result.error.details[0].message);
        return
    }

    const course = {
        id: courses.length + 1,
        name: req.body.name,
    };
    courses.push(course);
    res.send(course);
});


app.get('/api/courses/:id',(req,res)=>{
    //res.send(req.params.id);
    let course = courses.find((item) => item.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with the given ID was not found');
    }
    res.send(course);
});

const port = process.env.PORT || 3000;


app.listen(port, ()=>{
    console.log(`Server is running on port ${port} ...`);
});


app.put('/api/courses/:id',(req,res)=>{
    //checking if course exists
    let course = courses.find((item) => item.id === parseInt(req.params.id));
    if(!course){
        res.status(404).send('The course with the given ID was not found');
        return;
    }
    //validating

    //const result = validateCourse(req.body);
    const {error} = validateCourse(req.body); //equivalent to result.error

    if(error){
        res.status(400).send(result.error.details[0].message);
        return
    }

    //updating
    course.name = req.body.name;
    res.send(course);
})

function validateCourse(course){
    const schema = Joi.object({
        name: Joi.string().min(3).required()
    });
    return schema.validate(course);
}