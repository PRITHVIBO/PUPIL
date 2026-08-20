pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Checking out PUPIL source code...'
                checkout scm
            }
        }

        stage('Verify Project Files') {
            steps {
                bat '''
                    if not exist index.html (
                        echo ERROR: index.html not found
                        exit /b 1
                    )

                    if not exist CSS (
                        echo ERROR: CSS folder not found
                        exit /b 1
                    )

                    if not exist js (
                        echo ERROR: js folder not found
                        exit /b 1
                    )

                    if not exist images (
                        echo ERROR: images folder not found
                        exit /b 1
                    )

                    echo PUPIL project structure is valid.
                '''
            }
        }

        stage('Setup Dependencies') {
            steps {
                bat '''
                    if not exist package.json (
                        npm init -y
                    )

                    npm install --save-dev html-validate
                '''
            }
        }

        stage('Validate HTML') {
            steps {
                bat 'npx html-validate "*.html"'
            }
        }

        stage('Build') {
            steps {
                bat '''
                    if exist build rmdir /s /q build

                    mkdir build

                    copy *.html build\\

                    xcopy CSS build\\CSS\\ /E /I /Y
                    xcopy js build\\js\\ /E /I /Y
                    xcopy images build\\images\\ /E /I /Y

                    echo Build completed successfully.
                '''
            }
        }

        stage('Archive Build') {
            steps {
                archiveArtifacts artifacts: 'build/**', fingerprint: true
            }
        }
    }

    post {
        success {
            echo 'PUPIL Jenkins Pipeline completed successfully!'
        }

        failure {
            echo 'Pipeline failed. Check the failed stage logs.'
        }
    }
}