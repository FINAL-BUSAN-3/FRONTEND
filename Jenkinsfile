pipeline {

	agent any
	stages {
		stage('[WEB] Start') {
			steps {
				sh 'echo "[WEB Develop] Start"'
				slackSend(channel: '#deployment-alert', color: '#00FF7F' , message: "[Schedule Sync] Start : Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
			}
		}
		stage('[WEB] Git clone') {
                        steps {
                            script{
                                def localUser = 'ubuntu'
                                def localHost = 'ec2-98-81-190-167.compute-1.amazonaws.com'
                                def pemPath = '/var/jenkins_home/busan.pem'

                                sh 'echo "[Schedule Sync] Git clone"'
                                sh """
                                ssh -i ${pemPath} ${localUser}@${localHost} "cd /home/ubuntu/FRONTEND && git pull"
                                """
                                                slackSend(channel: '#deployment-alert', color: '#00FF7F' , message: "[WEB] GIT PULL : Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
                            }
                        }
                }
		stage('[WEB] WEB SERVER DOWN') {
			steps{
				script{
					def localUser = 'ubuntu'
                                	def localHost = 'ec2-98-81-190-167.compute-1.amazonaws.com'
                                	def pemPath = '/var/jenkins_home/busan.pem'
					

					sh """
                                	ssh -i ${pemPath} ${localUser}@${localHost} "sh /home/ubuntu/FRONTEND/web_killer.sh"
                                	"""

                                	sh 'echo "[WEB] SERVER DOWN"'

					slackSend(channel: '#deployment-alert', color: '#00FF7F' , message: "[WEB] SERVER DOWN : Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
				}
			}
				
		}
		stage('[WEB] WEB SERVER UP') {
			steps{
				script{
					def localUser = 'ubuntu'
                                        def localHost = 'ec2-98-81-190-167.compute-1.amazonaws.com'
                                        def pemPath = '/var/jenkins_home/busan.pem'

					sh """
                                        ssh -i ${pemPath} -T ${localUser}@${localHost} <<EOF
					cd /home/ubuntu/FRONTEND/busan
					nohup sh server_starter.sh > /dev/null 2&>1&
					EOF
                                        """
                                        sh 'echo "[WEB] SERVER ON"'
					slackSend(channel: '#deployment-alert', color: '#00FF7F' , message: "[WEB] SERVER ON : Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
				}
			}
		}
		stage('[WEB] Done') {
                        steps {
				sh 'echo "[WEB] Done"'
                                slackSend(channel: '#deployment-alert', color: '#00FF7F' , message: "[WEB] Done : Job '${env.JOB_NAME} [${env.BUILD_NUMBER}]' (${env.BUILD_URL})")
			}
                }
		
	}
}
