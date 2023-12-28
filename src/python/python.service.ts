import { Injectable } from '@nestjs/common';
import * as child from 'child_process';
import * as path from 'path'
import { PythonResult } from 'src/utils/interfaces';

process.on('uncaughtException', (err) => {
  console.error('uncaughtException: ', err);
});

@Injectable()
export class PythonService {
  static dlexecpath = path.join(process.cwd(), 'src', 'python', 'wild_detector.py')

  public runWildDetector(options: {
    inputDir: string;
  }): Promise<PythonResult> {
    const command = `python3 wild_detector.py 
        --input_dir ${options.inputDir}`

    // ex: python3 wild_detector.py --input_dir ./public/tmp/{user.username}/mv
    return new Promise((resolve, reject) => {
      child.exec(command, (error, stdout) => {
        if (error) {
          reject(error);
          return;
        }

        try {
          const result: PythonResult = JSON.parse(stdout);
          resolve(result);
        } catch (parseError) {
          reject(parseError);
        }
      });
    });
  }
}

