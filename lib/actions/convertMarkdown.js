'use babel';
import fs from 'fs';
import path from 'path';
import {
  v4 as uuidv4
} from 'uuid';
import fetch from 'node-fetch';

const apiURL = "https://vscode-markdown-converter-jl3f4c79.conholdate.cloud/api/markdown";

/**
* @description Convert MD to another format
* @param {string} option_type
*/
export default async function(option_type) {
  console.log('Aspose.HTML converter started!');
  const conf = atom.config.get('aspose-html-converter');
  let editor = atom.workspace.getActiveTextEditor();

  if (!editor) {
    atom.notifications.addError('Error', {
      detail: 'No active editor!'
    });
    return;
  }

  let grammarName = editor.getGrammar().name.toLowerCase();
  console.log(grammarName);
  if (grammarName !== 'github markdown') {
    atom.notifications.addError('Error', {
      detail: 'It does not seem to be a Github Markdown file.'
    });
    return;
  }
  let inputPath = editor.getPath();

  if (inputPath === undefined) {
    inputPath = path.join(os.tmpdir(), `${Date.now()}.md`);
    const bufferContent = editor.getBuffer().getText();
    fs.writeFileSync(inputPath, bufferContent);
  }
  let ext = path.extname(inputPath);

  let data = {
    machineId: uuidv4(),
    // guid: uuidv4(),
    content: editor.getBuffer().getText(),
    to: option_type,
    paper: conf['paper']
  };

  try {
    atom.notifications.addInfo('Converting to ' +
      option_type.toUpperCase() +
      '...', {
        icon: 'markdown'
      });

    let response = await fetch(apiURL, {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });

    let outputDirectory = conf['outputDirectory'] || '.';
    let outputFileName = inputPath.replace(ext, '.' + option_type);
    let outputFullPath = (outputDirectory !== '.') ?
      path.join(outputDirectory, path.basename(outputFileName)) :
      outputFileName;
    let blob = await response.blob();
    let readableStream = blob.stream().on('end', () => {
      atom.notifications.addSuccess('Converted successfully.', {
        detail: 'Output in ' + outputFullPath,
        icon: 'file-pdf',
      });
    });
    let writableStream = fs.createWriteStream(outputFullPath);
    readableStream.pipe(writableStream)
  } catch (e) {
    console.error(e.message);
    atom.notifications.addError('Error', {
      detail: e.message,
    });
  }
  console.log('Aspose.HTML converter finished!');
  return;
}
