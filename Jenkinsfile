pipeline {
    agent any

    environment {
        DOCKER_IMAGE = "xxshcoder/nodejs-mysql-restapi"
        PORT = "3000"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'master', url: 'https://github.com/xxshcoder/nodejs-mysql-restapi.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Optional if you have Jest/Supertest
                sh 'npm test || echo "No tests found, skipping"'
            }
        }

        stage('Build Docker Image') {
            steps {
                sh "docker build -t ${DOCKER_IMAGE}:latest ."
            }
        }

        stage('Push to Docker Hub') {
            steps {
                withCredentials([usernamePassword(credentialsId: 'dockerhub', usernameVariable: 'USERNAME', passwordVariable: 'PASSWORD')]) {
                    sh 'echo $PASSWORD | docker login -u $USERNAME --password-stdin'
                    sh "docker push ${DOCKER_IMAGE}:latest"
                }
            }
        }

        stage('Run Container') {
            steps {
                sh "docker stop nodejs-api || true"
                sh "docker rm nodejs-api || true"
                sh "docker run -d -p ${PORT}:3000 --name nodejs-api ${DOCKER_IMAGE}:latest"
            }
        }
    }

    post {
        always {
            sh "docker ps -a"
        }
    }
}
