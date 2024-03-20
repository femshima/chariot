import { bold, channelMention, underscore, userMention } from 'discord.js'
/**
 * @typedef {import('discord.js').ForumChannel} ForumChannel
 */

/**
 * @typedef {object} ForumChannelSetting
 * @property {string} id
 * @property {(ownerId: string | null | undefined) => string} onCreate
 * @property {(by?: string | null | undefined) => string} onReopen
 * @property {(by: string) => string} onReopenButtonRejected
 * @property {(ownerId: string | null | undefined, days: number) => string} onStale
 * @property {(ownerId: string) => string} onClose
 * @property {(ownerId: string) => string} onLock
 * @property {string} onNoStarter
 * @property {string} onOwnerClose
 */

/**
 * @typedef {object} Forum
 * @property {ForumChannel} channel
 * @property {ForumChannelSetting} setting
 */

/** @type {ForumChannelSetting[]} */
export const forumChannelSettings = [
  {
    id: '1019744831855153223',
    onCreate: ownerId =>
      [
        bold('もう一度確認してみよう:'),
        `• https://discordjs-japan.org/guidelines/questioner`,
        `• フォーラムチャンネルに設定された${bold('Post Guideline')}`,
        '',
        `質問に回答する方々は、${bold(
          '回答のガイドライン'
        )}を確認するようにしてください。`,
        '• https://discordjs-japan.org/guidelines/respondent',
        '',
        ownerId && userMention(ownerId),
        '問題が解決した場合、スレッドを閉じるようお願いいたします。',
        'なお、スレッドを閉じるには、下のボタンを押してください。',
      ].join('\n'),
    onReopen: by =>
      by
        ? [
            `${userMention(by)}がスレッドを再開しました。`,
            `${userMention(
              by
            )}さんは、意図せず再開した場合は下のボタンを押してください。`,
          ].join('\n')
        : 'スレッドが再開されました。',
    onReopenButtonRejected: by =>
      `${userMention(by)}がスレッドを再開しました。`,
    onStale: (ownerId, days) =>
      [
        ownerId && userMention(ownerId),
        `このスレッドは${days}日間操作がなかったため自動的に閉じさせていただきます。`,
        '',
        'なおこのスレッドは誰でも再開可能です。',
        '誰かによってスレッドが再開された場合は再度このスレッドにお知らせします。',
      ].join('\n'),
    onClose(ownerId) {
      return [
        userMention(ownerId),
        'この質問は複数のコミュニティメンバーからガイドラインに沿っていないと判断されたため、クローズされます。',
        '',
        '質問のガイドラインを再度熟読してください。',
        'https://discordjs-japan.org/guidelines/questioner',
        '',
        bold('◆特に確認すべき事項'),
        underscore('・Discord.jsに関する内容になっていますか？'),
        `　JavaScriptの文法や、Discord.jsを用いない内容（別のライブラリに関する内容など）の質問は ${channelMention(
          this.id
        )} では受け付けていません。`,
        underscore('・何が知りたいのか、相手に伝わる文章になっていますか？'),
        '　回答者は質問内容を把握できなければなにもできません。',
        underscore('・丸投げになっていませんか？'),
        '　回答者はあなたのソースコードを代わりに書くロボットではありません。',
        '',
        'ガイドラインに沿うように修正できるのであれば、質問内容を修正してください。修正を確定すると質問が再開されます。',
        '⚠️ 再開後、ガイドラインに沿わない状態が解消されていないと判断された場合、この質問をクローズののちロックします。',
      ].join('\n')
    },
    onLock: ownerId =>
      [
        userMention(ownerId),
        'この修正された質問は、複数のコミュニティメンバーからガイドラインに沿っていないと判断されたため、クローズします。',
        '',
        '❌ 今後この投稿はロックされ、内容の追記・編集はできません。',
      ].join('\n'),
    onNoStarter:
      '投稿内容（先頭のメッセージ）が削除されたため、このスレッドをロックします。',
    onOwnerClose:
      'スレッドをクローズしました。新しいメッセージを投稿したり、リアクションをつけたりすると再開できます。',
  },
]
