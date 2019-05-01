import { getImportPath, getStorybookLiveLink } from './rendererHelpers';

describe('rendererHelpers', () => {
  describe('getImportPath', () => {
    it('path matches package name', () => {
      const componentPath = '../../components/elements/src/action/Link.tsx';
      expect(getImportPath(componentPath, 'Link')).toBe("import { Link } from 'z-frontend-elements';");
    });
    it('path does not match package name', () => {
      const componentPath = '../../components/composite/src/task-list/TaskList.tsx';
      expect(getImportPath(componentPath, 'TaskList')).toBe("import { TaskList } from 'z-frontend-composites';");
    });
    it('subcomponent', () => {
      const componentPath = '../../components/forms/src/formik/select/FormSelect.tsx';
      expect(getImportPath(componentPath, 'Form.Select')).toBe("import { Form } from 'z-frontend-forms';");
    });
  });

  describe('getStorybookLiveLink', () => {
    it('path matches package name', () => {
      const componentPath = '../../components/elements/src/action/Link.tsx';
      expect(getStorybookLiveLink(componentPath, 'Link')).toBe('./app/stories/?selectedKind=elements%7CLink');
    });
    it('path does not match package', () => {
      // note: path is composite, package is composites
      const componentPath = '../../components/composite/src/task-list/TaskList.tsx';
      expect(getStorybookLiveLink(componentPath, 'TaskList')).toBe('./app/stories/?selectedKind=composites%7CTaskList');
    });
    it('subcomponent', () => {
      const componentPath = '../../components/forms/src/formik/select/FormSelect.tsx';
      expect(getStorybookLiveLink(componentPath, 'Form.Select')).toBe(
        './app/stories/?selectedKind=forms%7CForm.Select',
      );
    });
  });
});
