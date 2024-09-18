const { default: axios } = require('axios');
const model = require('../models/model');

exports.create = async (request, response) => {

    const data = new model({
        name: request.body.name,
        image: request.body.image,
        price: request.body.price,
    })

    await data.save()
        .then((success) => {
            const result = {
                status: true,
                message: 'data successfully added',
                data: success
            }
            response.send(result)
        })
        .catch((error) => {
            const result = {
                status: false,
                message: 'add error',
                error_message: error.message
            }
            response.send(result);
        })
}

exports.view = async (request, response) => {
    try {
        const viewvar = await model.find();

        var data = {
            status: true,
            message: 'data successfully viewed',
            data: viewvar
        }
        response.send(data);
    }
    catch (error) {
        const result = {
            status: false,
            message: 'view error',
            error_message: error.message
        }
        response.send(result);
    }

}

exports.deletes = async (request, response) => {
    try {
        const viewvar = await model.
            deleteOne({ _id: request.params.id });

        var data = {
            status: true,
            message: 'data successfully deleted',
            data: request.params
        }
        response.send(data);
    }
    catch (error) {
        const result = {
            status: false,
            message: 'deletes error',
            error_message: error.message
        }
        response.send(result);
    }
}

exports.update = async (request, response) => {
    try {
        const viewvar = await model.
            updateOne(
                { _id: request.params.id },
                {
                    $set: {
                        name: request.body.name
                    }
                });

        var data = {
            status: true,
            message: 'data successfully updated',
            data: request.params
        }
        response.send(data);
    }
    catch (error) {
        const result = {
            status: false,
            message: 'update error',
            error_message: error.message
        }
        response.send(result);
    }
}

exports.fetchdatafromapi = async (request, response) => {
    try {
        const { data } = await axios.get('https://api.wazirx.com/api/v2/tickers');
        const datatosave = Object.values(data).slice(0, 10).map(ticker => ({
            name: ticker.name,
            price: ticker.last
        }))
        await model.deleteMany({});
        var fetchdata = await model.insertMany(datatosave);

        var successfull = {
            status: true,
            message: 'successully fetched data from api',
            data: fetchdata
        }
        response.send(successfull);
    }
    catch (error) {
        var unsuccessful = {
            status: false,
            message: 'unsuccessful in fetching data from api',
            error_message: error.message
        }
        response.send(unsuccessful);
    }
}