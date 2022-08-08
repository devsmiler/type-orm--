import { AppDataSource } from "./data-source";
import { Classes } from "./entity/Class";
import { Customer } from "./entity/Customer";
import { Details } from "./entity/Details";
import { Project } from "./entity/Project";
import { Student } from "./entity/Student";
import { User } from "./entity/User";

AppDataSource.initialize()
    .then(async () => {
        console.log("Loading users from the database...");
        const users = await AppDataSource.manager.find(User);
        console.log("Loaded users: ", users);

        // console.log(
        //     "Here you can setup and run express / fastify / any other framework."
        // );

        const details = new Details();
        details.gender = "female";
        details.country = "india";
        await AppDataSource.manager.save(details);

        const customer = new Customer();
        customer.name = "customer1";
        customer.details = details;
        await AppDataSource.manager.save(customer);

        const proj = new Project();
        proj.projects = "SPARTA !";
        await AppDataSource.manager.save(proj);

        const proj2 = new Project();
        proj2.projects = "SPARTA ! project 2";
        await AppDataSource.manager.save(proj2);

        const classes1 = new Classes();
        classes1.name = "MY First Lecture";
        await AppDataSource.manager.save(classes1);

        const classes2 = new Classes();
        classes2.name = "MY 2nd Lecture";
        await AppDataSource.manager.save(classes2);

        const stud = new Student();
        stud.name = "Student1";
        stud.projects = [proj, proj2];
        stud.classes = [classes1, classes2];
        await AppDataSource.manager.save(stud);

        const studentRepository = AppDataSource.manager.getRepository(Student);
        const qur = await studentRepository.find();
        const qur2 = await studentRepository.find({
            relations: { projects: true, classes: true },
            order: { id: "DESC" },
            take: 2,
            cache: true,
        });
        console.log(qur);
        console.log(qur2);
    })
    .catch((error) => console.log(error));
