#!/usr/bin/env node

require("stylelint/lib/cli")('**/*.tsx --allow-empty-input');
// NOTE: enable that to identify needless disables (keeping off for now since there are false positives)
// require("stylelint/lib/cli")('**/*.tsx --allow-empty-input --report-needless-disables --formatter verbose');
