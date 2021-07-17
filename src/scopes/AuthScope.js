module.exports.authScope = (value) => {
  return {
    where: {
      userId: value
    }
  }
}
