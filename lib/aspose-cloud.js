'use babel';

import { CompositeDisposable } from 'atom';
import config from './config';
import convert from './actions/convertMarkdown.js';
import openSettings from './actions/open-settings';
import exportSettings from './actions/export-settings';

export default {
    config,
    convert,
    openSettings,
    exportSettings,

    subscriptions: null,

    activate() {
        this.subscriptions = new CompositeDisposable();
        this.subscriptions.add(
            atom.commands.add('atom-workspace', {
                'aspose-cloud:convert-to-HTML': () => this.convert('html'),
                'aspose-cloud:convert-to-PDF': () => this.convert('pdf'),
                'aspose-cloud:open-settings': () => this.openSettings(),
                'aspose-cloud:export-settings': () => this.exportSettings()
            }),
        );
    },

    deactivate() {
        this.subscriptions.dispose();
    }
};
