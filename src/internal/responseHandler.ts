import { NODE_ENV } from "../config";


export class ResponseHandler {
    res: any

    constructor(res: any) {
        this.res = res
    }

    success(data: object) {
        if (!data) {
            return this.res.json({
                 uccess: true
            })
        }

        return this.res.json({
            payload: data
        }) }

    error(data: any) {
        return this.res.json({
            status: data.status,
            success: false,
            error: data.error
        })
    }

    fatal(error: any) {
        if (NODE_ENV !== 'production') {
            console.log('Errors : ', error.errors);
        }
        if (!error.statusCode) {
            console.error(error.stack);
        }
        return this.res.status(error.statusCode).json({
            success: false,
            errors: error.errors
        });
    }
}