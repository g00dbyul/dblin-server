import { RuleConfigSeverity, UserConfig } from '@commitlint/types';

const Config: UserConfig = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [RuleConfigSeverity.Error, 'always', ['build', 'docs', 'feat', 'fix', 'perf', 'refactor', 'test']],
  },
  helpUrl: 'https://www.notion.so/git-commit-style-guide-fa8e01b37ac14ece92317a3483cbc59d',
};

module.exports = Config;
