'use babel';
import fs from 'fs';
import path from 'path';
import fetch from 'node-fetch';

/**
 * @description Export config to external file
 */
export default async function() {
  const conf = atom.config.get('aspose-cloud-converter');
  let outputDirectory = conf['outputDirectory'] || '.';

  let editor = atom.workspace.getActiveTextEditor();
  if (!editor) {
    atom.notifications.addError('Error', {
      detail: 'No active editor!',
    });
    return;
  }

  let inputPath = path.dirname(editor.getPath());
  if (inputPath === undefined) {
    inputPath = os.tmpdir();
  }

  if (outputDirectory === '.') {
    outputDirectory = inputPath
  }

  let configFileName = path.join(outputDirectory, 'aspose-cloud-converter-settings.json');
  let jsonContent = JSON.stringify(conf);
  fs.writeFile(configFileName, jsonContent, 'utf8', function(err) {
    if (err) {
      atom.notifications.addError('Error', {
        detail: err.message,
      });
      return;
    }
    atom.notifications.addSuccess('Converted successfully.', {
      detail: `Saved to: ${configFileName}`,
      icon: 'file-json',
    });
  });
}
