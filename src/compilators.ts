import * as less from 'less';
import * as colors from 'colors';
import * as fs from 'fs';

export class Compilators{

    static lessCompile(params) {
        if(fs.existsSync(params.appPath + '/../' + params.frontendDir + '/' + params.lessDir + '/styles.less')) {
            fs.readFile(params.appPath + '/../' + params.frontendDir + '/' + params.lessDir + '/styles.less', 'utf8', function(err, lessFile) {
                if (err) {
                    throw err;
                }

                less.render(lessFile,
                    {
                    paths: [params.appPath + '/../' + params.frontendDir + '/' + params.lessDir + ''],  // Specify search paths for @import directives
                    filename: 'styles.less', // Specify a filename, for better error messages
                    compress: true          // Minify CSS output
                    },
                    function (e, output) {
                    fs.writeFile(params.appPath + '/../' + params.frontendDir + '/' + params.lessDir + '/styles.css', output.css, function(err) {
                            if (err) {
                                throw err;
                            }
                            console.log(colors.green.bold('Less files compiled successfully!'));
                        });
                    });
            });
        } else {
            console.log(colors.yellow.bold('No less files found to compile!'));
        }
    }
}