import { ButtonStyle, ChannelType, ComponentType } from 'discord.js'
/**
 * @typedef {import('./logger.js').Logger} Logger
 * @typedef {import('discord.js').AnyThreadChannel} AnyThreadChannel
 * @typedef {import('discord.js').Interaction} Interaction
 * @typedef {import('./forum.js').ForumChannelSetting} ForumChannelSetting
 * @typedef {import('discord.js').MessageActionRowComponentData} MessageActionRowComponentData
 * @typedef {import('discord.js').ActionRowData<MessageActionRowComponentData>} ActionRowData
 */

/**
 * @param {Logger} logger
 * @param {AnyThreadChannel} thread
 * @param {ForumChannelSetting} setting
 */
export async function handleCreateNotify(logger, thread, setting) {
  if (thread.parent?.type !== ChannelType.GuildForum) return
  if (!thread.ownerId) return

  await thread
    .send({
      content: setting.onCreate(thread.ownerId),
      components,
    })
    .then(it => it.suppressEmbeds())

  logger.info(
    `"${thread.name}" (${thread.id}) has been created in "${thread.parent.name}" (${thread.parentId}).`
  )
}

/**
 * @param {Logger} logger
 * @param {Interaction} interaction
 * @param {ForumChannelSetting} setting
 */
export async function handleOwnerClose(logger, interaction, setting) {
  if (!interaction.isButton()) return
  if (interaction.customId !== components[0].components[0].customId) return

  const message = interaction.message
  const thread = message.channel
  if (!thread.isThread() || thread.parent?.type !== ChannelType.GuildForum)
    return

  if (interaction.user.id !== thread.ownerId) return

  await interaction.reply({
    content: setting.onOwnerClose,
    ephemeral: true,
  })

  await thread.setArchived(true, 'Owner used Close button')

  logger.info(
    `"${thread.name}" (${thread.id}) has been closed because the owner used Close button.`
  )
}

/** @satisfies {ActionRowData[]} */
const components = [
  {
    type: ComponentType.ActionRow,
    components: [
      {
        type: ComponentType.Button,
        style: ButtonStyle.Primary,
        label: 'クローズ',
        customId: 'owner_close',
      },
    ],
  },
]
