package network.akash.akashnotifier.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectReader;
import com.fasterxml.jackson.databind.ObjectWriter;
import lombok.extern.slf4j.Slf4j;
import network.akash.akashnotifier.dto.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.Duration;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Iterator;
import java.util.List;

@Slf4j
@Service
public class ConvertService {
	private final String remainingTimeCommand;
	private final ObjectReader jsonReader;
	private final ObjectWriter jsonWriter;
	private final ServiceProviderRunner serviceProviderRunner;

	public ConvertService(ObjectMapper mapper
			, ServiceProviderRunner serviceProviderRunner
			, @Value("#{${network.akash.akashnotifier.service.OwnerService.remaining-time-command}}")
						  String remainingTimeCommand) {
		this.jsonReader = mapper.reader();
		this.jsonWriter = mapper.writer();
		this.remainingTimeCommand = remainingTimeCommand;
		this.serviceProviderRunner = serviceProviderRunner;
	}

	public String convertToDTO(String id, String json, int limit, int offset) {
		try {
			if (!StringUtils.hasText(json)) {
				return jsonWriter.writeValueAsString(new DeploymentsPage(
						Collections.EMPTY_LIST, offset, limit, 0));
			}
			JsonNode objectNode = jsonReader.readTree(json);
			JsonNode deployments = objectNode.findValue("deployments");
			List<Deployment> data = new ArrayList<>();
			Iterator<JsonNode> it = deployments.elements();
			int numberOfElements = 0;
			int start = offset * limit + 1;
			int stop = start + limit;
			while (it.hasNext()) {
				++numberOfElements;
				JsonNode e = it.next();
				if (numberOfElements < start || numberOfElements >= stop) {
					continue;
				}
				JsonNode escrowAccount = e.findValue("escrow_account");
				JsonNode groupSpec = e.findValue("groups")
						.findValue("group_spec");
				JsonNode resource = groupSpec.findValue("resources");
				int count = Integer.parseInt(
						resource.findValue("count")
								.asText());
				JsonNode resources = resource.findValue("resource");
				Resource r = null;
				if (resources != null) {
					JsonNode storage = resources.findValue("storage");
					JsonNode endpoints = resources.findValue("endpoints");
					long totalStorage = 0;
					Iterator<JsonNode> elements = storage.elements();
					while (elements.hasNext()) {
						JsonNode g = elements.next();
						totalStorage += Long.parseLong(g.findValue("quantity")
								.findValue("val").asText());
					}
					elements = endpoints.elements();
					int numberOfEndpoints = 0;
					while (elements.hasNext()) {
						elements.next();
						++numberOfEndpoints;
					}
					r = new Resource(count, resources.findValue("cpu")
							.findValue("units").findValue("val").asText(),
							resources.findValue("memory")
									.findValue("quantity").findValue("val").asText(),
							String.valueOf(totalStorage), numberOfEndpoints);
				}
				String dseq = e.findValue("deployment")
						.findValue("deployment_id")
						.findValue("dseq")
						.asText(),
						providerName = groupSpec
								.findValue("name")
								.asText(),
						settledAt = escrowAccount.findValue("settled_at")
								.asText();
				Remaining remaining = null;
//				String remainingTimeResult = serviceProviderRunner.runCommand(
//						String.format(remainingTimeCommand, id, null, null, dseq));
//				JsonNode remainingTimeJn = jsonReader.readTree(remainingTimeResult);
//				remaining = new Remaining(remainingTimeJn.findValue("balance_remaining").asDouble(),
//						remainingTimeJn.findValue("blocks_remaining").asLong(),
//						Duration.of(remainingTimeJn.findValue("estimated_time_remaining").asLong(), ChronoUnit.NANOS));

				JsonNode balancejn = escrowAccount.findValue("balance");
				JsonNode transferredjn = escrowAccount.findValue("transferred");
				JsonNode pricejn = groupSpec.findValue("resources")
						.findValue("price");
				Scalar transferred = new Scalar(transferredjn.findValue("amount")
						.asText(), transferredjn.findValue("denom").asText()),
						balance = new Scalar(balancejn.findValue("amount")
								.asText(), balancejn.findValue("denom").asText()),
						price = new Scalar(pricejn.findValue("amount")
								.asText(), pricejn.findValue("denom").asText());
				data.add(new Deployment(dseq, settledAt, providerName, balance, transferred, price, r, remaining));
			}
			return jsonWriter.writeValueAsString(new DeploymentsPage(data, offset, limit
					, numberOfElements));
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}

	public String convertToDTO(String remainingTimeResult) {
		try {
			JsonNode remainingTimeJn = jsonReader.readTree(remainingTimeResult);
			Remaining remaining = new Remaining(remainingTimeJn.findValue("balance_remaining").asDouble(),
					remainingTimeJn.findValue("blocks_remaining").asLong(),
					Duration.of(remainingTimeJn.findValue("estimated_time_remaining").asLong(), ChronoUnit.NANOS));
			return jsonWriter.writeValueAsString(remaining);
		} catch (JsonProcessingException e) {
			throw new RuntimeException(e);
		}
	}
}
