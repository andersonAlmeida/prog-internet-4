const Agent = require('../models/agent')

exports.getAll = (req, res) => {
  Agent.find({}, (err, agents) => {
    if (err) {
      res.status(500).send(err)
    }
    res.json(agents)
  })
}

exports.getOne = (req, res) => {
  const id = req.params.id

  Agent.findById(id, (err, agent) => {
    if (err) {
      res.status(500).send({ erro: err })
    }

    res.json(agent)
  })
}

exports.getAvailable = () => {
  return Agent.findOne({ status: 1 }, (err, agent) => {
    if (err) {
      return err
    }

    return agent
  })
}

exports.create = (req, res) => {
  let newAgent = new Agent({ ...req.body, status: 1 })
  newAgent.save((err, agent) => {
    if (err) {
      res.send(err)
    }
    res.status(201).json(agent)
  })
}

exports.update = (id, agentUpdate) => {
  return Agent.findOneAndUpdate(
    { _id: id },
    agentUpdate,
    { new: true },
    (err, updated) => {
      if (err) {
        return err
      }

      return updated
    }
  )
}

exports.updateRequest = async (req, res) => {
  const id = req.params.id
  const agentUpdate = req.body

  const updated = await this.update(id, agentUpdate)

  res.json(updated)
}

exports.delete = (req, res) => {
  const id = req.params.id

  Agent.findByIdAndDelete({ _id: id }, (err, deleted) => {
    if (err) {
      res.send({ erro: err })
    }

    res.json(deleted)
  })
}
