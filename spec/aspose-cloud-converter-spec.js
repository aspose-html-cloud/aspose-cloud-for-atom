'use babel';

import AsposeHtmlConverter from '../lib/aspose-cloud-converter';

// Use the command `window:run-package-specs` (cmd-alt-ctrl-p) to run specs.
//
// To run a specific `it` or `describe` block add an `f` to the front (e.g. `fit`
// or `fdescribe`). Remove the `f` to unfocus the block.

describe('AsposeHtmlConverter', () => {
  let workspaceElement, activationPromise;

  beforeEach(() => {
    workspaceElement = atom.views.getView(atom.workspace);
    activationPromise = atom.packages.activatePackage('aspose-cloud-converter');
  });

  describe('when the aspose-cloud-converter:toggle event is triggered', () => {
    it('hides and shows the modal panel', () => {
      // Before the activation event the view is not on the DOM, and no panel
      // has been created
      expect(workspaceElement.querySelector('.aspose-cloud-converter')).not.toExist();

      // This is an activation event, triggering it will cause the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'aspose-cloud-converter:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        expect(workspaceElement.querySelector('.aspose-cloud-converter')).toExist();

        let asposeHtmlConverterElement = workspaceElement.querySelector('.aspose-cloud-converter');
        expect(asposeHtmlConverterElement).toExist();

        let asposeHtmlConverterPanel = atom.workspace.panelForItem(asposeHtmlConverterElement);
        expect(asposeHtmlConverterPanel.isVisible()).toBe(true);
        atom.commands.dispatch(workspaceElement, 'aspose-cloud-converter:toggle');
        expect(asposeHtmlConverterPanel.isVisible()).toBe(false);
      });
    });

    it('hides and shows the view', () => {
      // This test shows you an integration test testing at the view level.

      // Attaching the workspaceElement to the DOM is required to allow the
      // `toBeVisible()` matchers to work. Anything testing visibility or focus
      // requires that the workspaceElement is on the DOM. Tests that attach the
      // workspaceElement to the DOM are generally slower than those off DOM.
      jasmine.attachToDOM(workspaceElement);

      expect(workspaceElement.querySelector('.aspose-cloud-converter')).not.toExist();

      // This is an activation event, triggering it causes the package to be
      // activated.
      atom.commands.dispatch(workspaceElement, 'aspose-cloud-converter:toggle');

      waitsForPromise(() => {
        return activationPromise;
      });

      runs(() => {
        // Now we can test for view visibility
        let asposeHtmlConverterElement = workspaceElement.querySelector('.aspose-cloud-converter');
        expect(asposeHtmlConverterElement).toBeVisible();
        atom.commands.dispatch(workspaceElement, 'aspose-cloud-converter:toggle');
        expect(asposeHtmlConverterElement).not.toBeVisible();
      });
    });
  });
});
