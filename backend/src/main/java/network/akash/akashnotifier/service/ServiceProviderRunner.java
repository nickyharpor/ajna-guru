package network.akash.akashnotifier.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.Arrays;
import java.util.Map;

@Slf4j
@Service
public class ServiceProviderRunner {
	private final String newLine;
	private final Map<String, String> environment;

	public ServiceProviderRunner(
			@Value("#{${network.akash.akashnotifier.service.OwnerService.environment}}")
			Map<String, String> environment) {
		this.environment = environment;
		this.newLine = System.getProperty("line.separator");
	}

	public String runCommand(String command) throws RuntimeException {
		String[] split = command.split(" ");
		log.info(Arrays.toString(split));
		ProcessBuilder processBuilder = new ProcessBuilder();
		processBuilder.command(split);
		processBuilder.environment().putAll(environment);
		String line;
		BufferedReader bufferedReader;
		StringBuilder stringBuilder = new StringBuilder();
		try {
			Process process = processBuilder.start();
			process.waitFor();
			int exitValue = process.exitValue();
			bufferedReader = new BufferedReader(
					exitValue != 0 ?
							new InputStreamReader(process.getErrorStream()) :
							new InputStreamReader(process.getInputStream()));
			line = bufferedReader.readLine();
			while (line != null) {
				stringBuilder.append(line);
				stringBuilder.append(newLine);
				line = bufferedReader.readLine();
			}
			String result = stringBuilder.toString();
			log.info(result);
			if (exitValue == 0) {
				return result;
			}
			log.info(String.valueOf(exitValue));
			throw new RuntimeException(result);
		} catch (IOException | InterruptedException e) {
			throw new RuntimeException(e);
		}
	}
}

