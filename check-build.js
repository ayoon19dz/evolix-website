import { execSync } from 'child_process';

try {
  console.log("Running npm run build to check for errors...");
  const output = execSync('npm run build', { encoding: 'utf-8', stdio: 'pipe' });
  console.log("Build Output:");
  console.log(output);
} catch (e) {
  console.log("Build Error:");
  console.log(e.stdout);
  console.log(e.stderr);
}
