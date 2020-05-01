exports.run = async (client, message, args) => {
  const desc = args.join(' ')
  if (desc === undefined || desc === '') {
    return client.embed.send(message, { desc: 'Specify a guild description. Note that your guild invite will be attached automatically.' })
  }

  if (desc.length > client.config.ad.desc.max_length) {
    return client.embed.send(message, { desc: `Description can not be more then ${client.config.ad.desc.max_length} characters long.` })
  }
  if (desc.length < client.config.ad.desc.min_length) {
    return client.embed.send(message, { desc: `Description must have at least ${client.config.ad.desc.min_length} characters in it.` })
  }
  if (desc.includes('http') || desc.includes('@everyone') || desc.includes('@here')) {
    return client.embed.send(message, { desc: 'No links or mentions in the description please.' })
  }
  client.database.run('UPDATE settings SET desc = ? WHERE guildid = ?', [desc, message.guild.id])
  client.embed.send(message, { desc: 'Description sucessfully updated.' })
}

exports.conf = {
  enabled: true,
  aliases: [],
  guildOnly: false,
  permLevel: 'Server Owner'
}

exports.help = {
  name: 'desc',
  usage: '<description>',
  description: 'Set a description for your advertisement.'
}
