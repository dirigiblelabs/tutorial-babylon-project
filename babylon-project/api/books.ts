import { rs } from "@dirigible/http";
import { BookRepository, Book } from '../data/BookRepository';

const repository = new BookRepository();

rs.service()
    .resource("")
    .get(function (ctx, request, response) {
        const entities: Book[] = repository.list();

        response.setContentType("application/json");
        response.setStatus(response.OK);
        response.println(JSON.stringify(entities));
    })

    .resource("{id}")
    .get(function (ctx, request, response) {
        const id: number = ctx.pathParameters.id;
        const entity: Book = repository.findById(id);

        response.setContentType("application/json");
        if (entity) {
            response.setStatus(response.OK);
            response.println(JSON.stringify(entity));
        } else {
            response.setStatus(response.NOT_FOUND);
            response.println(JSON.stringify({
                code: response.NOT_FOUND,
                message: "Book not found"
            }));
        }
    })

    .resource("/count")
    .get(function (ctx, request, response) {
        const count: number = repository.count();

        response.setStatus(response.OK);
        response.println(`${count}`);
    })

    .resource("")
    .post(function (ctx, request, response) {
        const entity: Book = repository.create(request.getJSON());

        response.setHeader("Content-Location", `/services/ts/babylon-project/service/Books.ts/${entity.id}`);
        response.setStatus(response.CREATED);
    })

    .resource("{id}")
    .put(function (ctx, request, response) {
        const entity = request.getJSON();
        entity.id = ctx.pathParameters.id;
        repository.update(entity);
        response.setStatus(response.OK);
    })

    .resource("{id}")
    .delete(function (ctx, request, response) {
        const id: number = ctx.pathParameters.id;
        const entity: Book = repository.findById(id);

        if (entity) {
            repository.deleteById(id);
            response.setStatus(response.NO_CONTENT);
        } else {
            response.setStatus(response.NOT_FOUND);
            response.println(JSON.stringify({
                code: response.NOT_FOUND,
                message: "Book not found"
            }));
        }
    })
    .execute();