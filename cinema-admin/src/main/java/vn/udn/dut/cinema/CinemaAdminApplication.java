package vn.udn.dut.cinema;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.metrics.buffering.BufferingApplicationStartup;

/**
 * Starting program
 *
 * @author HoaLD
 */
@SpringBootApplication
public class CinemaAdminApplication {

    public static void main(String[] args) {
    	System.setProperty("spring.devtools.restart.enabled", "false");
        SpringApplication application = new SpringApplication(CinemaAdminApplication.class);
        application.setApplicationStartup(new BufferingApplicationStartup(2048));
        for(String arg : args) {
        	System.out.println(arg);
        }
        application.run(args);
        System.out.println("Cinema Admin started successfully");
    }
}
