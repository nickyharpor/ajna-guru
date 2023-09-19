package network.akash.akashnotifier.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class OwnerService {
    private final String activeDeploymentCommand,
            remainingTimeCommand,
            initCommand, initActionCommand;
    private final ConvertService convertService;
    private final ServiceProviderRunner serviceProviderRunner;

    public OwnerService(
            @Value("#{${network.akash.akashnotifier.service.OwnerService.active-deployments-command}}")
            String activeDeploymentCommand,
            @Value("#{${network.akash.akashnotifier.service.OwnerService.remaining-time-command}}")
            String remainingTimeCommand,
            @Value("#{${network.akash.akashnotifier.service.OwnerService.init-command}}")
            String initCommand,
            @Value("#{${network.akash.akashnotifier.service.OwnerService.init-action-command}}")
            String initActionCommand,
            ConvertService convertService,
            ServiceProviderRunner serviceProviderRunner) {
        this.remainingTimeCommand = remainingTimeCommand;
        this.convertService = convertService;
        this.activeDeploymentCommand = activeDeploymentCommand;
        this.serviceProviderRunner = serviceProviderRunner;
        this.initCommand = initCommand;
        this.initActionCommand = initActionCommand;
    }

    public String getAllActiveDeploymentsByOwner(String id
            , int limit, int offset) {
        String command = String.format(activeDeploymentCommand
                , id, limit, offset);
        String result = serviceProviderRunner.runCommand(command);
        return convertService.convertToDTO(id, result, limit, offset);
    }

    public String getRemainingTime(String id, String dseq) {
        String remainingTimeResult = serviceProviderRunner.runCommand(
                String.format(remainingTimeCommand, id, null, null, dseq));
        return convertService.convertToDTO(remainingTimeResult);
    }

    public boolean runInitCommand(int telegramId) {
        try {
            String booleanAsStr = serviceProviderRunner.runCommand(
                    String.format(initCommand, null, null, null, null, telegramId));
            return Boolean.parseBoolean(booleanAsStr);
        } catch (Exception ignored) {
        }
        return false;
    }

    public boolean runInitStartCommand(int telegramId, String akashAddress) {
        try {
            String booleanAsStr = serviceProviderRunner.runCommand(
                    String.format(initActionCommand, null, null, null, null
                            , telegramId, "start", akashAddress));
            return Boolean.parseBoolean(booleanAsStr);
        } catch (Exception ignored) {
        }
        return false;
    }

    public boolean runInitStopCommand(int telegramId, String akashAddress) {
        try {
            String booleanAsStr = serviceProviderRunner.runCommand(
                    String.format(initActionCommand, null, null, null, null
                            , telegramId, "stop", akashAddress));
            return Boolean.parseBoolean(booleanAsStr);
        } catch (Exception ignored) {
        }
        return false;
    }
}
