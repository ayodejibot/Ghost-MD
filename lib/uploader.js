//base by DGXeon (Xeon Bot Inc.)
//re-upload? recode? copy code? give credit ya :)
//YouTube: @DGXeon
//Instagram: unicorn_xeon13
//Telegram: t.me/xeonbotinc
//GitHub: @DGXeon
//WhatsApp: +916909137213
//want more free bot scripts? subscribe to my youtube channel: https://youtube.com/@DGXeon

let axios = require('axios')
let BodyForm = require('form-data')
let { fromBuffer } = require('file-type')
let fetch = require('node-fetch')
let fs = require('fs')
let cheerio = require('cheerio')



async function uploadToTelegraph(Path) {
  if (!fs.existsSync(Path)) {
      throw new Error("Fichier non existant");
  }

  try {
      const form = new FormData();
      form.append("file", fs.createReadStream(Path));

      const { data } = await axios.post("https://telegra.ph/upload", form, {
          headers: {
              ...form.getHeaders(),
          },
      });

      if (data && data[0] && data[0].src) {
          return "https://telegra.ph" + data[0].src;
      } else {
          throw new Error("Erreur lors de la récupération du lien de la vidéo");
      }
  } catch (err) {
      throw new Error(String(err));
  }
}



  try {
      const telegraphUrl = await uploadToTelegraph(mediaPath);
      fs.unlinkSync(mediaPath);  // Supprime le fichier après utilisation

      repondre(telegraphUrl);
  } catch (error) {
      console.error('Erreur lors de la création du lien Telegraph :', error);
      repondre('Opps error');
  }
});
async function uploadToTelegraph(Path) {
  if (!fs.existsSync(Path)) {
      throw new Error("Fichier non existant");
  }

  try {
      const form = new FormData();
      form.append("file", fs.createReadStream(Path));

      const { data } = await axios.post("https://telegra.ph/upload", form, {
          headers: {
              ...form.getHeaders(),
          },
      });

      if (data && data[0] && data[0].src) {
          return "https://telegra.ph" + data[0].src;
      } else {
          throw new Error("Erreur lors de la récupération du lien de la vidéo");
      }
  } catch (err) {
      throw new Error(String(err));
  }
}



function webp2mp4File(path) {
	return new Promise((resolve, reject) => {
		 const form = new BodyForm()
		 form.append('new-image-url', '')
		 form.append('new-image', fs.createReadStream(path))
		 axios({
			  method: 'post',
			  url: 'https://s6.ezgif.com/webp-to-mp4',
			  data: form,
			  headers: {
				   'Content-Type': `multipart/form-data; boundary=${form._boundary}`
			  }
		 }).then(({ data }) => {
			  const bodyFormThen = new BodyForm()
			  const $ = cheerio.load(data)
			  const file = $('input[name="file"]').attr('value')
			  bodyFormThen.append('file', file)
			  bodyFormThen.append('convert', "Convert WebP to MP4!")
			  axios({
				   method: 'post',
				   url: 'https://ezgif.com/webp-to-mp4/' + file,
				   data: bodyFormThen,
				   headers: {
						'Content-Type': `multipart/form-data; boundary=${bodyFormThen._boundary}`
				   }
			  }).then(({ data }) => {
				   const $ = cheerio.load(data)
				   const result = 'https:' + $('div#output > p.outfile > video > source').attr('src')
				   resolve({
						status: true,
						message: "Created By MRHRTZ",
						result: result
				   })
			  }).catch(reject)
		 }).catch(reject)
	})
}

async function floNime(medianya, options = {}) {
const { ext } = await fromBuffer(medianya) || options.ext
        var form = new BodyForm()
        form.append('file', medianya, 'tmp.'+ext)
        let jsonnya = await fetch('https://flonime.my.id/upload', {
                method: 'POST',
                body: form
        })
        .then((response) => response.json())
        return jsonnya
}

module.exports = { TelegraPh, UploadFileUgu, webp2mp4File, floNime }
