/*


███╗░░░███╗██████╗░
████╗░████║██╔══██╗
██╔████╔██║██████╔╝
██║╚██╔╝██║██╔══██╗
██║░╚═╝░██║██║░░██║
╚═╝░░░░░╚═╝╚═╝░░╚═╝

██╗░░██╗░█████╗░░██████╗██╗░░░██╗███╗░░██╗
██║░██╔╝██╔══██╗██╔════╝██║░░░██║████╗░██║
█████═╝░███████║╚█████╗░██║░░░██║██╔██╗██║
██╔═██╗░██╔══██║░╚═══██╗██║░░░██║██║╚████║
██║░╚██╗██║░░██║██████╔╝╚██████╔╝██║░╚███║
╚═╝░░╚═╝╚═╝░░╚═╝╚═════╝░░╚═════╝░╚═╝░░╚══╝

███╗░░░███╗██████╗░
████╗░████║██╔══██╗
██╔████╔██║██║░░██║
██║╚██╔╝██║██║░░██║
██║░╚═╝░██║██████╔╝
╚═╝░░░░░╚═╝╚═════╝░
*/

const config = require('../settings')
const fg = require('api-dylux');
const apkdl = require('../lib/apkdl')
const { mediafireDl } = require('mfiredlcore-vihangayt')
const { cmd, commands } = require('../lib/command')
const { Download } = require("nima-threads-dl-api")
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson, jsonformat} = require('../lib/functions')
const { pinterest, wallpaper, wikimedia, quotesAnime, aiovideodl, umma, ringtone, styletext } = require('../lib/scraper')
const gis = require('async-g-i-s')
//let gis = require('g-i-s')
const cheerio = require('cheerio')
const axios = require("axios")
const vm = require('vm')
const yts = require('yt-search');
const FormData = require('form-data')
const videoSearchResults = new Map()
let currentPollIndex = 0
let optionIndex = 1;
const fs = require('fs');
const {unsplash, pixabay} = require("@sl-code-lords/image-library")
var {subsearch , subdl }  = require('@sl-code-lords/si-subdl')
//var { SinhalaSub }  = require('@sl-code-lords/movie-dl')


const { Tiktok } = require('../lib/tiktok')
function regtik(url) {return url.includes('tiktok.com')}
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args))
async function fbDownloader(url) {
	try {
		const response1 = await axios({
			method: 'POST',
			url: 'https://snapsave.app/action.php?lang=vn',
			headers: {
				"accept": "*/*",
				"accept-language": "vi,en-US;q=0.9,en;q=0.8",
				"content-type": "multipart/form-data",
				"sec-ch-ua": "\"Chromium\";v=\"110\", \"Not A(Brand\";v=\"24\", \"Microsoft Edge\";v=\"110\"",
				"sec-ch-ua-mobile": "?0",
				"sec-ch-ua-platform": "\"Windows\"",
				"sec-fetch-dest": "empty",
				"sec-fetch-mode": "cors",
				"sec-fetch-site": "same-origin",
				"Referer": "https://snapsave.app/vn",
				"Referrer-Policy": "strict-origin-when-cross-origin"
			},
			data: {
				url
			}
		});

		let html;
		const evalCode = response1.data.replace('return decodeURIComponent', 'html = decodeURIComponent')
		eval(evalCode);
		html = html.split('innerHTML = "')[1].split('";\n')[0].replace(/\\"/g, '"')

		const $ = cheerio.load(html)
		const download = []

		const tbody = $('table').find('tbody')
		const trs = tbody.find('tr')

		trs.each(function (i, elem) {
			const trElement = $(elem)
			const tds = trElement.children()
			const quality = $(tds[0]).text().trim()
			const url = $(tds[2]).children('a').attr('href')
			if (url != undefined) {
				download.push({
					quality,
					url
				});
			}
		});

		return {
			success: true,
			download
		};
	}
	catch (err) {
		return {
			success: false
		};
	}
}
function fbreg(url) {
const fbRegex = /(?:https?:\/\/)?(?:www\.)?(m\.facebook|facebook|fb)\.(com|me|watch)\/(?:(?:\w\.)*#!\/)?(?:groups\/)?(?:[\w\-\.]*\/)*([\w\-\.]*)/
return fbRegex.test(url)
}

//============================================================================

async function Insta(match) {
  const result = []
          const form = {
            url: match,
            submit: '',
          }
          const { data } = await axios(`https://downloadgram.org/`, {
            method: 'POST',
            data: form
          })
          const $ = cheerio.load(data)
                  $('#downloadhere > a').each(function (a,b) {
          const url = $(b).attr('href')
          if (url) result.push(url)
        })
              return result
  }

//============================================================================

async function sswebA(url = '', full = false, type = 'desktop') {
	type = type.toLowerCase()
	if (!['desktop', 'tablet', 'phone'].includes(type)) type = 'desktop'
	let form = new URLSearchParams()
	form.append('url', url)
	form.append('device', type)
	if (!!full) form.append('full', 'on')
	form.append('cacheLimit', 0)
	let res = await axios({
		url: 'https://www.screenshotmachine.com/capture.php',
		method: 'post',
		data: form
	})
	let cookies = res.headers['set-cookie']
	let buffer = await axios({
		url: 'https://www.screenshotmachine.com/' + res.data.link,
		headers: {
			'cookie': cookies.join('')
		},
		responseType: 'arraybuffer' 
	})
	return Buffer.from(buffer.data)
}


function formatUploadDate(uploadDate) {
  const date = new Date(uploadDate)
  return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
