import { validateContent } from "../src/lib/validate-content";

const issues = validateContent();
const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warning");

for (const warning of warnings) {
  console.warn(`WARN: ${warning.message}`);
}
for (const error of errors) {
  console.error(`ERROR: ${error.message}`);
}

if (errors.length) {
  console.error(`\nContent validation failed with ${errors.length} error(s).`);
  process.exit(1);
}

console.log(
  `Content validation passed (${warnings.length} warning(s), ${issues.length - warnings.length} info-level checks).`,
);
