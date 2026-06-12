const express = require('express');
const { Telegraf, Markup } = require('telegraf');
require('dotenv').config();

// ============ CONFIGURATION ============
const BOT_TOKEN = process.env.BOT_TOKEN;
const PORT = process.env.PORT || 3000;

// Links and URLs
const REGISTER_LINK = 'https://app.bitai.app/h5/#/pages/sign/sign?invite=888';
const DOWNLOAD_BITAL = 'https://fr.bitai.app/app.html';
const BINANCE_REGISTER = 'https://accounts.binance.com/en/register?ref=1154159582';
const BINANCE_DOWNLOAD = 'https://www.binance.com/en/download';
const SUPPORT_WA = 'http://wa.me/6589691668';
const EMAIL_SUPPORT = 'info@bitai.app';
const WEBSITE = 'https://www.bitai.app';

// ==============================================
// ⚠️ IMPORTANT: REPLACE THESE FILE_IDS WITH YOUR ACTUAL ONES
// To get file_id: Send video to your bot, then forward to @getidsbot
// ==============================================
const VIDEOS = {
    entry: 'REPLACE_WITH_FILE_ID_FROM_IVlL9mus1vk',
    step1: 'REPLACE_WITH_FILE_ID_FROM_-FOS2Vp9g2k',
    step2: 'REPLACE_WITH_FILE_ID_FROM_51S50bjeit8',
    step3: 'REPLACE_WITH_FILE_ID_FROM_fDmnibIgefs',
    step4: 'REPLACE_WITH_FILE_ID_FROM_4sc6C_jt3Xg',
    step5: 'REPLACE_WITH_FILE_ID_FROM_BzBoXzPuwlg',
    step6: 'REPLACE_WITH_FILE_ID_FROM_M8XAcPEvYtQ',
    step7: 'REPLACE_WITH_FILE_ID_FROM_aY8r4J3OJSY'
};

// ============ MESSAGES ============
const messages = {
    entry: `
🤖 *Welcome to BitAl by Affinity AI*

Most crypto traders don't lose because they lack knowledge.

They lose because manual trading is emotional, bot settings are messy, and execution comes too late.

⏰ It's time to upgrade to *BitAl* - built to analyze real-time market data and execute your trades automatically, 24/7.
    `,
    step1: `
📌 *Step 1/7: Register and download BitAl*

To start using BitAl, you need to register for your FREE BitAl account and download the BitAl app.
    `,
    step2: `
📌 *Step 2/7: Setting up Binance Account*

To start using BitAl, you need a Binance account with KYC verification completed.
    `,
    step3: `
📌 *Step 3/7: BitAI License Activation*

To unlock BitAI's full auto AI trading, activate your BitAI License inside your BitAI app.
    `,
    step4: `
📌 *Step 4/7: Activate & Enable Binance Futures*

Before BitAI can execute, you need to activate Binance Futures inside your Binance account.
    `,
    step5: `
📌 *Step 5/7: Set Up Your API Keys*

Create your Binance API Keys and connect them to your BitAI account.
⚠️ Keep your API Keys private!
    `,
    step6: `
📌 *Step 6/7: Transfer USDT to Binance Futures*

Transfer USDT into your Binance Futures Wallet for trading.
    `,
    step7: `
📌 *Step 7/7: Select Your Risk Profile*

Choose your preferred BitAI Risk Profile based on your capital and goals.

🎯 *BitAI will now trade automatically 24/7!*
    `
};

// ============ BOT INITIALIZATION ============
const app = express();
const bot = new Telegraf(BOT_TOKEN);

// User session storage
const userStates = new Map();

// Video sender helper
async function sendVideo(ctx, videoId, caption) {
    if (!videoId || videoId.startsWith('REPLACE_WITH_FILE_ID')) {
        await ctx.reply(caption);
        await ctx.reply('⚠️ Video not configured yet. Please contact support.');
        return;
    }
    
    try {
        await ctx.replyWithVideo(videoId, {
            caption: caption,
            supports_streaming: true,
            parse_mode: 'Markdown'
        });
    } catch (error) {
        console.error('Video error:', error.message);
        await ctx.reply(caption);
        await ctx.reply('⚠️ Video failed to load. Please contact support.');
    }
}

// ============ BOT COMMANDS & ACTIONS ============

// Start command
bot.command('start', async (ctx) => {
    userStates.set(ctx.from.id, 'entry');
    await sendVideo(ctx, VIDEOS.entry, messages.entry);
    
    await ctx.reply(
        '🔽 *Choose an option:* 🔽',
        Markup.inlineKeyboard([
            [Markup.button.callback('✅ Register FREE Account', 'register')],
            [Markup.button.callback('📱 Download BitAl', 'download')],
            [Markup.button.callback('▶️ Start Setup Guide (7 Steps)', 'start_setup')],
            [Markup.button.callback('📞 Support', 'support')]
        ])
    );
});

// Show Step 1
async function showStep1(ctx) {
    userStates.set(ctx.from.id, 'step1');
    await sendVideo(ctx, VIDEOS.step1, messages.step1);
    await ctx.reply(
        '🔽 *Next steps:* 🔽',
        Markup.inlineKeyboard([
            [Markup.button.url('✅ Register BitAl', REGISTER_LINK)],
            [Markup.button.url('📱 Download App', DOWNLOAD_BITAL)],
            [Markup.button.callback('▶️ Next: Binance Setup', 'step2')],
            [Markup.button.callback('📞 Support', 'support')]
        ])
    );
}

// Show Step 2
async function showStep2(ctx) {
    userStates.set(ctx.from.id, 'step2');
    await sendVideo(ctx, VIDEOS.step2, messages.step2);
    await ctx.reply(
        Markup.inlineKeyboard([
            [Markup.button.url('✅ Create Binance Account', BINANCE_REGISTER)],
            [Markup.button.url('📱 Download Binance', BINANCE_DOWNLOAD)],
            [Markup.button.callback('▶️ Next: License Activation', 'step3')],
            [Markup.button.callback('◀️ Back', 'back_to_step1')]
        ])
    );
}

// Show Step 3
async function showStep3(ctx) {
    userStates.set(ctx.from.id, 'step3');
    await sendVideo(ctx, VIDEOS.step3, messages.step3);
    await ctx.reply(
        Markup.inlineKeyboard([
            [Markup.button.callback('▶️ Next: Enable Futures', 'step4')],
            [Markup.button.callback('◀️ Back', 'back_to_step2')],
            [Markup.button.callback('📞 Support', 'support')]
        ])
    );
}

// Show Step 4
async function showStep4(ctx) {
    userStates.set(ctx.from.id, 'step4');
    await sendVideo(ctx, VIDEOS.step4, messages.step4);
    await ctx.reply(
        Markup.inlineKeyboard([
            [Markup.button.callback('▶️ Next: API Keys', 'step5')],
            [Markup.button.callback('◀️ Back', 'back_to_step3')],
            [Markup.button.callback('📞 Support', 'support')]
        ])
    );
}

// Show Step 5
async function showStep5(ctx) {
    userStates.set(ctx.from.id, 'step5');
    await sendVideo(ctx, VIDEOS.step5, messages.step5);
    await ctx.reply(
        Markup.inlineKeyboard([
            [Markup.button.callback('▶️ Next: Transfer USDT', 'step6')],
            [Markup.button.callback('◀️ Back', 'back_to_step4')],
            [Markup.button.callback('📞 Support', 'support')]
        ])
    );
}

// Show Step 6
async function showStep6(ctx) {
    userStates.set(ctx.from.id, 'step6');
    await sendVideo(ctx, VIDEOS.step6, messages.step6);
    await ctx.reply(
        Markup.inlineKeyboard([
            [Markup.button.callback('▶️ Next: Risk Profile', 'step7')],
            [Markup.button.callback('◀️ Back', 'back_to_step5')],
            [Markup.button.callback('📞 Support', 'support')]
        ])
    );
}

// Show Step 7
async function showStep7(ctx) {
    userStates.set(ctx.from.id, 'step7');
    await sendVideo(ctx, VIDEOS.step7, messages.step7);
    await ctx.reply(
        '✅ *Setup Complete!* ✅\n\nYour BitAl bot is now ready to trade!\n\nChoose an option:',
        Markup.inlineKeyboard([
            [Markup.button.url('🌐 Website', WEBSITE)],
            [Markup.button.url('✉️ Email Support', `mailto:${EMAIL_SUPPORT}`)],
            [Markup.button.url('📞 WhatsApp', SUPPORT_WA)],
            [Markup.button.callback('◀️ Back to Step 6', 'back_to_step6')],
            [Markup.button.callback('❌ Exit', 'exit')]
        ])
    );
}

// Handle back navigation
async function handleBack(ctx, fromStep) {
    switch(fromStep) {
        case 'step1': await showStep1(ctx); break;
        case 'step2': await showStep2(ctx); break;
        case 'step3': await showStep3(ctx); break;
        case 'step4': await showStep4(ctx); break;
        case 'step5': await showStep5(ctx); break;
        case 'step6': await showStep6(ctx); break;
        default: await showStep1(ctx);
    }
}

// Handle all button clicks
bot.action(/.*/, async (ctx) => {
    const action = ctx.callbackQuery.data;
    
    switch(action) {
        case 'register':
            await ctx.reply(`🔗 Register here: ${REGISTER_LINK}`);
            break;
        case 'download':
            await ctx.reply(`📱 Download BitAl: ${DOWNLOAD_BITAL}`);
            break;
        case 'start_setup':
            await showStep1(ctx);
            break;
        case 'step2':
            await showStep2(ctx);
            break;
        case 'step3':
            await showStep3(ctx);
            break;
        case 'step4':
            await showStep4(ctx);
            break;
        case 'step5':
            await showStep5(ctx);
            break;
        case 'step6':
            await showStep6(ctx);
            break;
        case 'step7':
            await showStep7(ctx);
            break;
        case 'back_to_step1':
            await showStep1(ctx);
            break;
        case 'back_to_step2':
            await showStep2(ctx);
            break;
        case 'back_to_step3':
            await showStep3(ctx);
            break;
        case 'back_to_step4':
            await showStep4(ctx);
            break;
        case 'back_to_step5':
            await showStep5(ctx);
            break;
        case 'back_to_step6':
            await showStep6(ctx);
            break;
        case 'support':
            await ctx.reply(
                `📞 *Support Options:*\n\nWhatsApp: ${SUPPORT_WA}\nEmail: ${EMAIL_SUPPORT}\nWebsite: ${WEBSITE}`,
                { parse_mode: 'Markdown' }
            );
            break;
        case 'exit':
            await ctx.reply('👋 Thank you! Type /start to begin again.');
            userStates.delete(ctx.from.id);
            break;
    }
    
    await ctx.answerCbQuery();
});

// ============ SERVER SETUP ============

// Health check
app.get('/health', (req, res) => {
    res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Webhook endpoint
app.post(`/webhook/${BOT_TOKEN}`, (req, res) => {
    bot.handleUpdate(req.body, res);
});

// Start the bot
async function start() {
    try {
        if (process.env.RAILWAY_PUBLIC_DOMAIN) {
            const webhookUrl = `https://${process.env.RAILWAY_PUBLIC_DOMAIN}/webhook/${BOT_TOKEN}`;
            await bot.telegram.setWebhook(webhookUrl);
            console.log(`✅ Webhook set: ${webhookUrl}`);
        } else {
            await bot.launch();
            console.log('✅ Bot started in polling mode');
        }
        
        app.listen(PORT, () => {
            console.log(`🚀 Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Failed to start:', error);
        process.exit(1);
    }
}

// Graceful shutdown
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

start();
