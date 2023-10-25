import { rs } from "@dirigible/http";
import { BookRepository, Book } from '../data/BookRepository';

const repository = new BookRepository();

rs.service()
    .resource("")
    .get(function (ctx, request, response) {
        const entities: Book[] = repository.list();

        response.setContentType("application/json");
        response.setStatus(200);
        response.println(JSON.stringify(entities));
    }).produces(["application/json"])

    .resource("{id}")
    .get(function (ctx, request, response) {
        const id: number = ctx.pathParameters.id;
        const entity: Book = repository.findById(id);

        response.setContentType("application/json");
        if (entity) {
            response.setStatus(200);
            response.println(JSON.stringify(entity));
        } else {
            response.setStatus(404);
            response.println(JSON.stringify({
                code: 404,
                message: "Book not found"
            }));
        }
    }).produces(["application/json"])

    .resource("/count")
    .get(function (ctx, request, response) {
        const count: number = repository.count();

        response.setStatus(200);
        response.println(`${count}`);
    })

    .resource("")
    .post(function (ctx, request, response) {
        const entity = request.getJSON();

        entity.id = repository.create(entity);

        response.setContentType("application/json");
        response.setStatus(201);
        response.setHeader("Content-Location", `/services/ts/babylon-project/service/Books.ts/${entity.id}`);
        response.println(JSON.stringify(entity));
    }).produces(["application/json"])

    .resource("{id}")
    .put(function (ctx, request, response) {
        const entity = request.getJSON();
        entity.id = ctx.pathParameters.id;

        repository.update(entity);

        response.setContentType("application/json");
        response.setStatus(200);
        response.println(JSON.stringify(entity));
    }).produces(["application/json"])

    .resource("{id}")
    .delete(function (ctx, request, response) {
        const id: number = ctx.pathParameters.id;

        const entity: Book = repository.findById(id);

        if (entity) {
            repository.deleteById(id);
            response.setStatus(204);
        } else {
            response.setContentType("application/json");
            response.setStatus(404);
            response.println(JSON.stringify({
                code: 404,
                message: "Book not found"
            }));
        }
    }).produces(["*/*"])
    .execute();