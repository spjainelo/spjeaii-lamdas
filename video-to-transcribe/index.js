exports.handler = async function (event, context) {
  try {
    console.log("INDEX EXPORT HANDLER", event);
  } catch (error) {
    console.log(error);
  }


  return {
    statusCode: 200,
    body: JSON.stringify('Hello from Lambda!'),
  };
};